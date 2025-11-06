import SessionRepository from "../repositories/sessionRepository.js";

class SessionServices {
  constructor() {
    this.sessionRepo = new SessionRepository();
  }

  async createSession(data) {
    this.sessionRepo.create(data);
  }

  async deleteSession(data) {
   return this.sessionRepo.delete(data);
  }

  async findByIp(ip){
   return this.sessionRepo.findByIP({ip:ip})
  }
}

export default SessionServices;