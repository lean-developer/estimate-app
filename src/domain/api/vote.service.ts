import http from './server/http'
import { Vote } from '../models/vote'
import { DeleteResult } from '../models/deleteResult'

class VoteService {
  async getVotes (status?: string): Promise<Vote[] | undefined> {
    try {
      let api = 'vote'
      if (status) {
        api += '?status=' + status
      }
      const resp = await http.get(api)
      return resp.data as Vote[]
    } catch (e) {
      console.error(e)
    }
  }

  async getVote (id: number): Promise<Vote | undefined> {
    try {
      const api = 'vote/' + id
      const resp = await http.get(api)
      return resp.data as Vote
    } catch (e) {
      console.error(e)
    }
  }

  async createVote (name: string): Promise<Vote | undefined> {
    try {
      const api = 'vote?name=' + name
      const resp = await http.post(api)
      console.log('RESP', resp)
      return resp.data as Vote
    } catch (e) {
      console.error(e)
    }
  }

  async updateVote (vote: Vote): Promise<Vote | undefined> {
    try {
      const api = 'vote'
      const resp = await http.patch(api, vote)
      return resp.data as Vote
    } catch (e) {
      console.error(e)
    }
  }

  async deleteVote (id: number): Promise<DeleteResult | undefined> {
    try {
      const api = 'vote/' + id
      const resp = await http.delete(api)
      return resp.data as DeleteResult
    } catch (e) {
      console.error(e)
    }
  }
}

export default new VoteService()
