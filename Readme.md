# InkWell

> A REST API for a blogging platform where users can write blog posts, but the posts must be approved by an admin before being published.

##  Features

- Auth + API Key (JWT, key generation)
- Role-based access (admin vs user)
- Blog post workflow (create → approve/reject)
- CRUD for posts & categories
- Slug-based URLs (/posts/my-first-post)
- Comments system (comments table with user + post)

## Tech Stack

- **Language:** Typescript 
- **Backend:** Node.js, Express.js
- **Database:** MongoDB 
- **Tools & Services:** : JWT, voca

## Installation

1. Clone the repo

    ```bash
    git clone https://github.com/mukulpal03/InkWell.git
    cd your-project-name
    ```

2. Install dependencies
   ```sh
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env` and fill in DB, JWT, etc.

4. Start server:
   ```sh
   npm run dev
   ```

## License

MIT License

---