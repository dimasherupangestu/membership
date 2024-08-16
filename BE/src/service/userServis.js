import prisma from "../config/prisma.js";

export default new (class UserServis {
  async getUsers() {
    const users = await prisma.user.findMany();
    return users;
  }
  async GetUserById(id) {
    console.log("first", id);
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    return user;
  }

  async GetUserByArticle(membership) {
    console.log("membership", membership);
    const user = await prisma.user.findUnique({
      where: {
        id: membership,
      },
    });
    // console.log("user", user);

    const resault = user.articleId.map((val) => {
      return {
        id: val,
      };
    });
    // console.log("rs", resault);
    const article = await prisma.article.findMany({
      where: {
        OR: resault,
      },
    });

    // console.log("article", article);
    return article;
  }

  async GetUserByVideo(membership) {
    console.log("membership", membership);
    const user = await prisma.user.findUnique({
      where: {
        id: membership,
      },
    });
    // console.log("user", user);
    const resault = user.movieId.map((val) => {
      return {
        id: val,
      };
    });

    const movie = await prisma.movie.findMany({
      where: {
        OR: resault,
      },
    });

    return movie;
  }
})();
