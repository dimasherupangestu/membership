import prisma from "../config/prisma.js";

export default new (class MemberServis {
  async createMember(data) {
    const membership = await prisma.accessControl.create({
      data: {
        membership: data.membership,
        limitArtikel: data.limitArtikel,
        limitVidio: data.limitVideo,
        acceessVideo: data.accessVideo,
        acceessArtikel: data.accessArtikel,
      },
    });

    return membership;
  }

  async getMembers() {
    const members = await prisma.accessControl.findMany();
    return members;
  }
})();
