import { Session } from "../models/sessionSchema.js";

class SessionRepository {
    async create(data) {
      return  Session.create(data);
    }

    async delete(data) {
        return Session.deleteOne(data)
    }

    async findByIP(ip) {
        return Session.findOne(ip)
    }

    async deleteManySessions (id){
        return Session.deleteMany({userId:id});
    }
}

export default SessionRepository;