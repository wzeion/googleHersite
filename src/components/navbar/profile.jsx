
import React, { useState } from 'react';

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState('https://storage.googleapis.com/a1aa/image/aDgEyRVOo3LgKI5xMgNi8juOTRz7q6njWz4IzBSPuCI.jpg');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Simulate contribution data
  const contributions = [
    { date: '2023-04-01', count: 1 },
    { date: '2023-04-02', count: 2 },
    { date: '2023-04-03', count: 3 },
    // Add more data as needed
  ];

  const generateContributionGrid = () => {
    const grid = [];
    for (let i = 0; i < 365; i++) {
      const contribution = contributions.find(c => new Date(c.date).getTime() === new Date(2023, 0, i + 1).getTime());
      let bgColor = 'bg-gray-700';
      if (contribution) {
        if (contribution.count > 2) {
          bgColor = 'bg-green-700';
        } else if (contribution.count > 1) {
          bgColor = 'bg-green-500';
        } else {
          bgColor = 'bg-green-300';
        }
      }
      grid.push(<div key={i} className={`w-4 h-4 ${bgColor}`}></div>);
    }
    return grid;
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center md:flex-row md:items-start">
          <div className="flex flex-col items-center md:items-start md:w-1/3">
            <div className="relative">
              <img
                alt="Profile picture of a person sitting on a bench"
                className="rounded-full w-48 h-48 mb-4"
                src={profileImage}
              />
              <input
                type="file"
                accept="image/*"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageUpload}
              />
            </div>
            <h1 className="text-2xl font-bold">SHANI KUMAR</h1>
            <p className="text-gray-400">shanikumar001 · he/him</p>
            <p className="mt-2 text-center md:text-left">
              Web &amp; App Developer | UI/UX Designer | Crafting seamless, user-friendly digital experiences with clean code and intuitive design.
            </p>
            <button className="mt-4 px-4 py-2 bg-gray-800 rounded">Edit profile</button>
          </div>
          <div className="md:w-2/3 md:pl-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Popular repositories</h2>
              <a className="text-blue-500" href="#">Customize your pins</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded h-full">
                <div className="flex justify-between items-center">
                  <a className="text-blue-500" href="#">myFirstProject</a>
                  <span className="text-gray-400">Public</span>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded h-full">
                <div className="flex justify-between items-center">
                  <a className="text-blue-500" href="#">Portfolio</a>
                  <span className="text-gray-400">Public</span>
                </div>
                <div className="mt-2">
                  <span className="text-orange-500">● HTML</span>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded h-full">
                <div className="flex justify-between items-center">
                  <a className="text-blue-500" href="#">Exploratory-Data-Analysis-on-Social-Media-Data</a>
                  <span className="text-gray-400">Public</span>
                </div>
                <p className="mt-2 text-gray-400">
                  This project involves analyzing social media interactions and engagement metrics to derive insights about user behavior, content performance, and trends. The goal is to understand how users engage ...
                </p>
                <div className="mt-2">
                  <span className="text-blue-500">● Python</span>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded h-full">
                <div className="flex justify-between items-center">
                  <a className="text-blue-500" href="#">HerSite</a>
                  <span className="text-gray-400">Public</span>
                </div>
                <p className="mt-2 text-gray-400">Forked from wzeion/HerSite</p>
                <p className="mt-2 text-gray-400">frontend</p>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-bold">11 contributions in the last year</h2>
              <div className="flex items-center mt-2">
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400">
                  <div>Mon</div>
                  <div></div>
                  <div>Wed</div>
                  <div></div>
                  <div>Fri</div>
                </div>
                <div className="ml-4">
                  <div className="grid grid-cols-53 gap-1">
                    {generateContributionGrid()}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <span>Less</span>
                    <span>More</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="relative">
                  <select className="bg-gray-800 text-white p-2 rounded">
                    <option>Contribution settings</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">2025</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;




