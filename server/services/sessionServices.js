import SessionRepository from "../repositories/sessionRepository.js";

class SessionServices {
  constructor() {
    this.sessionRepo = new SessionRepository();
  }

  async createSession(data) {
  return await this.sessionRepo.create(data);
  }

  async deleteSession(token,userId) {
  return await this.sessionRepo.delete({accessToken:token,userId});
  }

  async deleteSessionByIP(data) {
    return await this.sessionRepo.delete(data);
  }

  async findByIp(ip){
   return this.sessionRepo.findByIP({ip:ip})
  }
}

export default SessionServices;