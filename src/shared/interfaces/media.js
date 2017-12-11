import { getUser } from '@/shared/auth-service'

export default {
  _id: '',
  type: '',
  extension: '',
  url: '',
  owner: getUser()._id,
  right: '',
  media_file: null,
  usage: [],
  created_by: '',
  updated_at: '',
  created_at: '',
  updated_by: ''
}
