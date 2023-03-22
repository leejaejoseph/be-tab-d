// This only returns a text div for the about page.

import React from 'react';

export default function About() {
  return (
    <div className='mx-auto mt-10 flex flex-col gap-3 items-center justify-center w-3/5'>
      <p className="comfortaa text-4xl font-bold text-[#676767] mb-16 fade-in">
        About
      </p>
      <p className="comfortaa text-xl text-[#323232] leading-8 fade-in">
        be tab’d is a tool to convert a csv file to a relational database and is soon to organize your docs/pdf files into folders by keywords.
        I wanted to build a project that would help me gain a deeper understanding of working with data and databases.
      </p>
      <p className="mt-10 comfortaa text-xl text-[#323232] leading-8 fade-in">
        While the project currently requires users to upload a set collection of CSV file, my plan is to improve the project by making it automatically parse CSV files with a multitude of headers. Through building this project, I have learned a lot about backend technologies such as PostgreSQL, as well as how to structure and manipulate data in the backend. I am excited to continue improving this project and applying my newfound knowledge to future projects.
      </p>
    </div>
  );
}
