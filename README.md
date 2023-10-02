<a name="readme-top"></a>
# Book-collection backend application(with a Domain-driven design approach)

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

This project was written as an extension to my previous project. The main idea is to use a DDD (Domain-driven design) approach to facilitate further scaling or transition to more modern tools, as well as to modalize the program to divide it into several desks, which would also simplify debugging or integration. As an example that this approach is really convenient, I used databases with different models, for example: MongoDB, PostgreSQL and in-memory storage Redis to save user sessions. ORM (TypeORM) and ODM (Mongoose) were also used. It may not be perfect, but I'm always happy to hear a comment about my code.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

This section describes the technologies and frameworks I used in my project Here are a few examples.

[![Technologies](https://skillicons.dev/icons?i=docker,express,ts,nodejs,mongodb,postgres,redis,regex&perline=5)](https://skillicons.dev)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install
  ```


### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a API Key at Gmail and create tokens at JWT
2. Clone the repo
   ```sh
   git clone https://github.com/hhuziuk/library_platform_ddd.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API data in `.env`
   ```js
   NODE_ENV='ENTER_YOUR_API'
   NODE_ENV='ENTER_YOUR_API'
   PORT='ENTER_YOUR_API'

   POSTGRES_HOST='ENTER_YOUR_API'
   POSTGRES_PORT='ENTER_YOUR_API'
   POSTGRES_USER='ENTER_YOUR_API'
   POSTGRES_PASSWORD='ENTER_YOUR_API'
   POSTGRES_DB='ENTER_YOUR_API'

   MONGODB_URL='ENTER_YOUR_API'

   REDIS_PORT='ENTER_YOUR_API'
   REDIS_URL='ENTER_YOUR_API'
   REDIS_HOST='ENTER_YOUR_API'
   REDIS_SECRET='ENTER_YOUR_API'

   EMAIL_USER='ENTER_YOUR_API'
   EMAIL_PASS='ENTER_YOUR_API'
   EMAIL_PORT='ENTER_YOUR_API'
   EMAIL_HOST='ENTER_YOUR_API'

   JWT_ACCESS_SECRET='ENTER_YOUR_API'
   JWT_REFRESH_SECRET='ENTER_YOUR_API'

   API_URL='ENTER_YOUR_API'
   CLIENT_URL='ENTER_YOUR_API'
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

To get better acquainted with the usage, I recommend you to read the documentation written with Swagger

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/Features`)
3. Commit your Changes (`git commit -m 'Add some Features'`)
4. Push to the Branch (`git push origin feature/Features`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact
Heorhii Huziuk - huziukwork@gmail.com

Project Link: [https://github.com/hhuziuk/backend_project_ts](https://github.com/hhuziuk/backend_project_ts)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
