// import { adminConnection } from "@/utils/adminConnection"
import UserRow from "@/components/users/userRow"


async function loadUsers(){
  // let users = []
  // const conn = await adminConnection()
  // // console.log(conn)
  // const users = await conn.model('User').find()
  // // console.log(conn)
  // // const usersByDb = Object.groupBy(users, ({database})=>database)
  // // console.log(usersByDb)
  // return users
}

export default async function Home() {
  const users = await loadUsers()
  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="grid grid-cols-5 bg-gray-950">
        <div>Nombre</div>
        <div>Teléfono</div>
        <div>eMail</div>
        <div>Base de datos</div>
        <div>Fecha de creación</div>
      </div>
      {users.map(user=>(
        <UserRow user={user} key={user._id}/>
      ))}
    </div>
  )
}
