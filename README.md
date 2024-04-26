# Coding Exercise for International Rotation

## Index
- [Overview](#overview)
- [Demo](#demo)
- [Tech stack used](#tech-stack-used)
- [Prerequisites](#prerequisites)
- [Setup](#setup)

## Overview
This document provides a guide to set up the project environment and dependencies. Problem Statement [link](./Coding%20Challenge%20PCOE.pdf)

## Demo
Deployed on SAP BTP: 
- Frontend Web Application: https://c2f331b1trial-dev-1znthjpb-dev-coding-exercise.cfapps.us10-001.hana.ondemand.com/app/dist/index.html
- Backend Service: https://c2f331b1trial-dev-1znthjpb-dev-coding-exercise-srv.cfapps.us10-001.hana.ondemand.com/

**Note**: The above links are deployed on SAP BTP Trial Account and may not be available after the trial period, you can refer to the video for the demo or set up the project locally.

## Tech stack used:
- SAP CAP Framework
- SAP CDS
- Node.js
- SAP UI5
- SQLite ( for Local Development )
- SAP HANA DB ( for Deployment )
- SAP BTP ( for Development )

## Prerequisites
Before proceeding with the setup, ensure you have the following installed:
-  [Node.js](https://nodejs.org/en/download)
-  [CDS](https://cap.cloud.sap/docs/get-started/jumpstart#setup)
-  [Git](https://git-scm.com/downloads) 
-  [UI5 setup](https://sap.github.io/ui5-tooling/v3/pages/GettingStarted/)
-  [Cloud Foundary CLI](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html) 
-  Access to [Trial BTP](https://cockpit.hanatrial.ondemand.com/trial/#/home/trial) (optional)
-  [Github Desktop](https://desktop.github.com/) (optional)


## Setup
1. **Clone the repository using the following command:**
    ```bash
    git clone https://github.com/Krish-Bhardwaj-SAP/coding_exercise.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd coding_exercise
    ```
3. **Install the dependencies:** 
- In the root directory:
    ```bash
    npm install
    ```
- In the app and frontend directories:
    ```bash
    cd app
    npm install
    ```
    ```bash
    cd frontend
    npm install
    ```
- Navigate back to the root directory:
    ```bash
    cd ../../
    ```
4. **Deploy the DB (SQLite) for local development:** 
    ```bash
    cds deploy
    ```
5. **Run the project:**
    ```bash
    cds watch
    ```
6. **Open the browser and navigate to the following URL for SAP CDS Server:**
    ```bash
    http://localhost:4004/
    ```
7. **Open the browser and navigate to the following URL for Web Application:**
    ```bash
    http://localhost:4004/dist/index.html
    ```
8. **To deploy the project to SAP BTP, follow the steps mentioned in the [link](https://cap.cloud.sap/docs/guides/deployment/to-cf#build-mta) (Optional)**

    if you have all the instances and subscriptions available. in BTP Trial Account you can you with below mentioned commands to deploy the project:
    ```bash
    mbt build -t ./
    cf deploy coding_exercise_1.0.0.mtar 
    ```

