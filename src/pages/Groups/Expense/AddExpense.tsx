import { Breadcrumb } from "components";
import Joi from "joi";
import Button from "components/Button";
import FormInput from "components/FormInput";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { authService, expenseService } from "services";
import { getMyFriends } from "../../../services/friendService"; 
import { putIntoS3 } from "../../../services/s3Service";
import { parseReceiptFromTextract } from "../../../services/mlService";
import ToastContext from "contexts/ToastContext";

const AddExpense = ({ group }: any) => {
  const { groupId } = useParams();
  const currentUser: any = authService.getCurrentUser();

  const { showToast } = useContext(ToastContext);

  const [data, setData] = useState({
    description: "",
    amount: "",
    groupId: groupId,
    paidBy: currentUser.id,
    items: [],
    file: null,
    receiptUrl: "",
    names: getMyFriends(currentUser) as any,
  });
  const [errors, setErrors] = useState({
    description: "",
    amount: 0
  });

  const schema: any = {
    description: Joi.string().required().label("Description"),
    amount: Joi.string().required().label("Amount"),
    groupId: Joi.string().required().label("Group Id"),
    paidBy: Joi.string().required().label("Paid By"),
    name: Joi.string().required().label("Name"),
    quantity: Joi.string().required().label("Quantity"),
    owner: Joi.string().required().label("Owner")
  };

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.object(schema).validate(data, options);
    if (!error) return null;
    const errors: any = {};
    for (const item of error.details) errors[item.path[0]] = item.message;
    if (true) return null; //check
    return errors;
  };

  const validateProperty = ({ name, value }: any) => {
    const obj = { [name]: value };
    const Joischema = { [name]: schema[name] };
    const { error } = Joi.object(Joischema).validate(obj);
    return error ? error.details[0].message : null;
  };

  const handleChange = ({ currentTarget: input }: any) => {
    setErrors({
      ...errors,
      [input.name]: ""
    });
    const errorMessage = validateProperty(input);
    if (errorMessage) [input.name] = errorMessage;
    setData({ ...data, [input.name]: input.value });
    setErrors(errors);
  };

  const handleAddExpense = async (e : Event) => {
    e.preventDefault();
    const validationErrors = validate();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    // Upload file to S3 if it exists
    if (data.file) {
      try {
        return;
      } catch (uploadError) {
        showToast("Failed to upload file.", "error");
        return;
      }
    }

    try {
      const result = await expenseService.addExpense(data);
      if (result) {
        showToast("Expense added successfully", "success");
        window.location.href = `/group/detail/${groupId}`;
      }
    } catch (error) {
      showToast("Failed to add expense.", "error");
    }
  };

  const doSubmit = async () => {
    try {
      const result = await expenseService.addExpense(data);
      if (result) {
        showToast("Expense added successfully", "success");
        window.location.href = `/group/detail/${groupId}`;
      }
    } catch (error: any) {
      if (error.response) {
        setErrors({ ...errors });
      }
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (data.file) {
      putIntoS3('split-bill-receipts', data.file); 
      
      data.receiptUrl = `https://split-bill-receipts.s3.amazonaws.com/${data.file}`;

      var items: any = parseReceiptFromTextract(data.receiptUrl)
      setData({...data, items});
      
      setPreviewUrl(URL.createObjectURL(file));
      setData({ ...data, file });
    }
  };

  return (
    <div className="mt-4 h-full flex-1 px-4 flex flex-col  sm:px-6 xl:max-w-6xl lg:mx-auto lg:px-8">
      <Breadcrumb
        paths={[
          { name: "Groups", to: "/groups" },
          { name: "Group Detail", to: `/group/detail/${groupId}` },
          { name: "Add Expense", to: `/group/${groupId}/addexpense` },
        ]}
      />
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Add Expense
          </h2>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="mt-4 mb-4">
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload Receipt</label>
        <input id="file" name="file" type="file" onChange={handleFileChange} className="mt-2 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100
        "/>
        {previewUrl && <img src={previewUrl} alt="Receipt preview" className="mt-4 w-full max-w-xs" />}
      </div>

      <div className="max-w-lg">
        <FormInput
          label="Description"
          name="description"
          placeholder="Enter description"
          value={data.description}
          onChange={handleChange}
          error={errors ? errors.description : ""}
        />
        <FormInput
          label="Amount"
          name="amount"
          placeholder="0.00"
          type="number"
          showLeadingIcon
          value={data.amount}
          onChange={handleChange}
          // error={errors ? errors.amount : ""}
        />
        <div className="flex justify-between space-x-4">
          <div className="flex-1 flex">
            {/* loop through the items from the state */}
            {
            data.items.map((item: any, index: any) => (
              <div key={index}>
                <FormInput
                  label={`Item`}
                  name={item.itemName}
                  type="text"
                  value={item.itemValue}
                  onChange={(e) => handleChange(e)}
                />
                <FormInput
                  label="Quantity"
                  name={item.quantityName}
                  type="number"
                  value={item.quantityValue}
                  onChange={(e) => handleChange(e)}
                />
                <select
                  name="Owner"
                  value={item.itemOwner}
                  onChange={(e) => handleChange(e)}
                  style={{ width: '100%', height: 41, marginTop: 32, borderRadius: 2 }}
                >
                  <option value="">Select Person</option>
                  {data.names.map((name: any) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mt-3 max-w-fit border border-green-600 px-3 py-1 text-green-700 font-medium rounded-full text-sm">
            Split Equally
          </p>
          <p className="mt-3 max-w-fit border border-green-600 px-3 py-1 text-green-700 font-medium rounded-full text-sm">
            Split Unequally
          </p>
          <p className="mt-3 max-w-fit border border-green-600 px-3 py-1 text-green-700 font-medium rounded-full text-sm">
            Split By Percentage
          </p>
          <p className="mt-3 max-w-fit border border-green-600 px-3 py-1 bg-green-100 text-green-700 font-medium rounded-full text-sm">
            Split By Item
          </p>
        </div>

        <Button
          margin="mt-6"
          width="w-full"
          disabled={validate()}
          onClick={handleAddExpense}
        >
          Add Expense
        </Button>
      </div>
    </div>
  );
};

export default AddExpense;
