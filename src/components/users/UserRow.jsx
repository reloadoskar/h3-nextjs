export default function UserRow({ user }) {
    return (
        <div className="grid grid-cols-5 bg-gray-800 p-2 text-white rounded-md hover:cursor-pointer hover:bg-gray-500">
            <div>{user.nombre}</div>
            <div>{user.telefono}</div>
            <div>{user.email}</div>
            <div>{user.database}</div>
            <div >{new Date(user.createdAt).toLocaleDateString()}</div>
        </div>
    )
}
