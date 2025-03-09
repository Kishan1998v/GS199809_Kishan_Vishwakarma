# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Data Viewer App

This project is a Data Viewer application built with React, TypeScript, and Vite. It allows users to upload Excel files, view and manipulate data in tables, and visualize data using charts.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/data-viewer-app.git
    cd data-viewer-app
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm run dev
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Use the "Upload file" button to upload an Excel file (.xls or .xlsx).
3. Navigate through different sections using the navigation menu.
4. View and manipulate data in tables.
5. Visualize data using charts.

## Features

- **Excel File Upload**: Upload and process Excel files.
- **Data Visualization**: View data in tables and charts.
- **Data Manipulation**: Add, update, and delete data entries.
- **Responsive Design**: Works on various screen sizes.

## Project Structure
├── public/ 
│   └── vite.svg 
├── src/ 
│   ├── assets/ 
│   │   └── gsynergy_logo.svg 
│   ├── components/ 
│   │   ├── AddItem/ 
│   │   │   ├── AddItem.tsx 
│   │   │   └── createPlanner.tsx 
│   │   ├── AgTable/ 
│   │   │   └── AgTable.tsx 
│   │   ├── Charts/ 
│   │   │   └── Charts.tsx 
│   │   ├── Common/ 
│   │   │   ├── Button.tsx 
│   │   │   ├── Loading.tsx 
│   │   │   └── _common.css 
│   │   ├── Header.tsx 
│   │   ├── Home.tsx 
│   │   ├── Nav.tsx 
│   │   ├── Planning/ 
│   │   │   └── Planning.tsx 
│   │   ├── SKU/ 
│   │   │   └── Sku.tsx 
│   │   ├── Store/ 
│   │   │   └── Store.tsx 
│   │   ├── UploadExcel/ 
│   │   │   ├── UploadExcel.tsx 
│   │   │   └── excelSlice.ts 
│   │   └── const.ts 
│   ├── store/ 
│   │   ├── sampleConst.ts 
│   │   └── store.ts 
│   ├── styles/ 
│   │   ├── App.css 
│   │   ├── Home.css 
│   │   ├── index.css 
│   ├── App.tsx 
│   ├── main.tsx 
│   ├── vite-env.d.ts 
├── .gitignore 
├── index.html 
├── package.json 
├── postcss.config.js 
├── tailwind.config.js 
├── tsconfig.app.json 
├── tsconfig.json 
├── tsconfig.node.json 
└── vite.config.ts

### Components

- **Store**: The `Store` component displays and manages store data.
- **SKUs**: The `SKU` component displays and manages SKU data.
- **Planner**: The `Planner` component allows users to create and manage planning data.
- **Charts**: The `Charts` component visualizes data using various chart types.
- **UploadExcel**: The `UploadExcel` component provides functionality to upload and process Excel files.

### Functionality

- **Upload Excel**: Users can upload Excel files (.xls or .xlsx) through the `UploadExcel` component. The uploaded file is processed, and the data is displayed in the application. Users can then view, add, update, and delete data entries.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License.