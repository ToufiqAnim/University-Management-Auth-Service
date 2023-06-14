/* import { User } from './users.model'

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean() //lean gives document as plain old javascript objects not mongoose documents.It makes queries faster
  return lastUser?.id
}

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0')
  const incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  return incrementId
} */
import { User } from './user.model';
const generateUserId = async () => {
  //get current year
  const currentYear = new Date().getFullYear().toString().slice(-2);

  // get last user id fgorm db
  const lastUserId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  let actualId: string;
  if (lastUserId) {
    const lastId = lastUserId.id.slice(-4);

    const nextId = (parseInt(lastId) + 1).toString().padStart(4, '0');
    actualId = nextId;
  } else {
    actualId = '0001';
  }
  const id = `${currentYear}-${actualId}`;
  return id;
};
export default generateUserId;
