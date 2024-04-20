import {
  DocumentReportIcon,
  UserGroupIcon,
  CollectionIcon,
  UserIcon,
} from "@heroicons/react/outline";
import Header from "../components/Header";
import Button from "../components/Button";
import HashNodeLogo from "../images/hashnode.png";
import { ReactComponent as PieChart } from "../images/pie-chart.svg";
import { ReactComponent as CircleGroup } from "../images/circle-group.svg";
import { ReactComponent as Linode } from "../images/Linode.svg";
import DashboardImg from "../images/dashboard.png";
import GroupImg from "../images/group.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const features = [
  {
    name: "Group Expenses",
    description: "Share your expenses among group of friends with ease.",
    icon: UserGroupIcon,
  },
  {
    name: "Manage Expenses",
    description:
      "Keep track of your expenses. Manage whom you owe and also who owes you.",
    icon: CollectionIcon,
  },
  {
    name: "Share it Individually",
    description: "Share the bill with your friends individually.",
    icon: UserIcon,
  },

  {
    name: "Expense Reporting",
    description: "Track all your expenses with our reporting service.",
    icon: DocumentReportIcon,
  },
];

export default function LandingPage() {
  useEffect(() => {
    document.title = "SplitWise | Home";
  }, []);

  return (
    <div className="bg-white">
      <Header />
      <main>
        {/* Hero section */}
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0" />
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative sm:overflow-hidden">
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-gray-800">
                    SplitWise with your friends
                  </span>
                  <span className="block text-green-600">
                  without any difficulty
                  </span>
                </h1>
                <p className="mx-auto mt-6 max-w-lg text-center text-xl text-gray-500 sm:max-w-3xl">
               
                </p>
                <div className="sm:max-w-10 mx-auto mt-10 max-w-sm sm:flex sm:justify-center">
                  <Link to="/signup" className="w-full">
                    <Button width="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient Feature Section */}
        <div className="bg-gradient-to-r from-purple-800 to-green-700">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:px-8 lg:pt-24">
            <h2 className="text-3xl font-extrabold tracking-tight text-white text-centre">
              Our Features
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-gray-200">
             
            </p>
            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name}>
                  <div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-white bg-opacity-10">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-base text-blue-200">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8 lg:pt-24">
          <div className="flex items-center justify-between">
           
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between lg:mt-16">
            <p className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
            
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
