# Federal Student Loan Analysis: The Decade in Review

### The purpose of my project is to analyze student loan data within the United States in an effort to understand the amount of student loan debt within the United States, as well as patterns that may emerge based on location, type of school, as well as types of loans. In recent years, many political as well as media outlets have mentioned the student loan crisis and this discussion has also shifted the way people view the cost and return on higher education, as well as the need to restructure the way student loans are being lent and forgiven.

To start, I will be doing an analysis of yearly student loan data found on Federal Student Aid: https://studentaid.ed.gov/sa/about/data-center/student. I plan on utilizing Python pandas to reorganize the data as well as plotly as my main source of data visualization. As I begin to gain more experience in data analysis, I will be making regular updates to this repository in hopes to create a deeper analysis of federal student loan data from year to year.

#### Yearly Student Loan Data Analysis
This analysis takes into consideration 10 years of loan origination and disbursement data from all students utilizing federal financial. Part of the initial data analysis involved dropping unnecessary data rows, renaming and reorganizing data columns so that it is more compatible with a SQL database link, as well as appending columns to make aid year based distictions. Addiitonally, in exploring the dataset, I have found that there were some inconsistent school names that resulted from a 10 year data collection timeline, so a major part of the data cleaning also involved finding the correct school name to utilize in order to better represent a school's lending history.

Once all of the data has been prepared, I created a SQLite link to create a table that includes year specific loan data. After creating the tables, I created a Python Flask application and Javascript to create application routes and visualizations. Finally, I utilized Bootstrap/HTML/CSS frameworks to create a website dashboard that visualizes student loan data over the past 10 years.

Although a dashboard is available for view at the moment, I will continue working on updating the dashboard to include more granular and in-depth analysis on student loans.
