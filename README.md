# Ecommerce Admin

Admin Demo Link: https://admin-next-ecom.vercel.app

StoreFront (SC): https://github.com/ajitsingh09/Ecommerce-frontend/tree/master

StoreFront Demo Link: https://next-real-ecom.vercel.app/

## Overview

This project is an admin dashboard built using Next.js and MongoDB for managing an ecommerce website. It includes features for product management, order tracking, and user authentication. Additionally, Amazon S3 is used to store product images, and NextAuth is integrated for authentication purposes.

## Features

- **Next.js**: The project is built on the Next.js framework, providing a fast and efficient React-based development experience.

- **MongoDB**: MongoDB is used as the database to store and manage product data, user information, and order details.

- **Amazon S3 Integration**: Product images are stored in an Amazon S3 bucket, ensuring reliable and scalable image storage.

- **NextAuth**: Authentication is handled using NextAuth, which provides a secure and customizable authentication system.

## Getting Started

#### Pre-requisites

- Node.js: Make sure you have Node.js installed on your machine.

- MongoDB: Set up a MongoDB database and obtain the connection string.

- Amazon S3: Create an Amazon S3 bucket and obtain the necessary credentials.

- ### Installation

  1. Clone the repo

  ```
  git clone https://github.com/your-username/ ecommerce-admin-dashboard.git
  cd ecommerce-admin-dashboard
  ```

  2. Install dependencies:

  ```
   npm install

  ```

  3. Create a .env file in the root directory with the following variables:

  ```bash
  GOOGLE_CLIENT_ID=
  GOOGLE_CLIENT_SECRET=
  MONGODB_URI=
  S3_ACCESS_KEY=
  S3_SECRET_ACESS_KEY=
  NEXT_PUBLIC_SECRET=


  ```

  4.Run the development server :

  ```
  npm run dev
  ```

## Usage

- **Authentication**: Use NextAuth for user authentication. Customize authentication settings as needed.

- **Product Management**: Manage products, update information, and upload images to the Amazon S3 bucket.

- **Order Tracking**: Keep track of customer orders and update order status accordingly.

## Contributing

Contributions are always welcome!
