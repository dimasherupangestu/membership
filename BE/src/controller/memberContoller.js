import prisma from "../config/prisma.js";
import memberServis from "../service/memberServis.js";

export default new (class MemberController {
  async getMembers(req, res) {
    const members = await memberServis.getMembers();
    res.status(200).json({ members });
  }

  async createMember(req, res) {
    try {
      const {
        membership,
        limitArtikel,
        limitVideo,
        accessVideo,
        accessArtikel,
      } = req.body;

      const response = await memberServis.createMember({
        membership,
        limitArtikel,
        limitVideo,
        accessVideo,
        accessArtikel,
      });

      res.status(200).json({ response });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async updateMemberArticle(req, res) {
    try {
      const user = req.user;

      const { idArtikel } = req.body;
      // console.log("tes", idArtikel);
      const getMember = await prisma.accessControl.findUnique({
        where: {
          membership: user.membership,
        },
      });
      const getUser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (getUser.acceessArtikel === false) {
        throw Error("Access artikel is not active");
      }
      const chkArtikel = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
        select: {
          articleId: true,
          acceessArtikel: true,
        },
      });

      // console.log("first", chkArtikel);
      if (chkArtikel.articleId.includes(idArtikel)) {
        throw Error("Artikel already added");
      }

      console.log("second", chkArtikel);
      const response = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          articleId: {
            push: idArtikel,
          },
        },
      });

      // console.log("response", response);
      // console.log("getMember", getMember);

      if (response.articleId.length >= getMember.limitArtikel) {
        const updateStatus = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            acceessArtikel: false,
          },
        });
      }

      return res.status(200).json({ response });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
      console.log(error);
    }
  }

  async updateMemberVideo(req, res) {
    try {
      const user = req.user;
      const { idVideo } = req.body;
      const getMember = await prisma.accessControl.findUnique({
        where: {
          membership: user.membership,
        },
      });
      const getUser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (getUser.accessVideo === false) {
        throw Error("Access video is not active");
      }

      const chkVideo = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
        select: {
          movieId: true,
        },
      });

      if (chkVideo.movieId.includes(idVideo)) {
        throw Error("Video already added");
      }

      const response = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          movieId: {
            push: idVideo,
          },
        },
      });
      // console.log("response", response);
      // console.log("getMember", getMember);

      if (response.movieId?.length >= getMember.limitVideo) {
        const updateStatus = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            acceessVideo: false,
          },
        });
      }
      return res.status(200).json({ response });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
})();
