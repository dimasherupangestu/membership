import prisma from "../config/prisma.js";

export default new (class MovieServis {
  async getMovies() {
    const movies = await prisma.movie.findMany();
    return movies;
  }
  async getMovieById(id) {
    const movie = await prisma.movie.findUnique({
      where: {
        id: Number(id),
      },
    });
    return movie;
  }

  async cretaeMovie(data) {
    const movie = await prisma.movie.create({
      data: {
        title: data.title,
        content: data.content,
        url: data.url,
        imageString: data.imageString,
      },
    });
    return movie;
  }

  async deleteMovie(id) {
    const movie = await prisma.movie.delete({
      where: {
        id: Number(id),
      },
    });
    return movie;
  }
})();
