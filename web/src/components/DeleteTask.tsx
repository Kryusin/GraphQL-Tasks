import { IconButton, Tooltip } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { useMutation } from "@apollo/client"
import { DELETE_TASK } from "../mutation/taskMutations"
import { GET_TASKS } from "../queries/taskQueries"
import { useNavigate } from "react-router-dom"

const DeleteTask = ({
    id,
    userId
}: {
    id: number,
    userId: number
}) => {

    const [deleteTask] = useMutation<{ deleteTask: number }>(DELETE_TASK);
    const navigate = useNavigate();

    const handleDeleteTask = async () => {
        try {
            await deleteTask({
                variables: { id },
                refetchQueries: [{ query: GET_TASKS, variables: { userId } }]
            });
            alert('タスクが削除されました');
        } catch (error: any) {
            if (error.message === 'Unauthorized') {
                localStorage.removeItem('token');
                alert('認証エラーが発生しました。再ログインしてください。');
                navigate('/signin');
                return;
            }

            alert('タスクの削除に失敗しました');
        }
    }

    return (
        <div>
            <Tooltip title='削除'>
                <IconButton onClick={handleDeleteTask}>
                    <DeleteIcon color='action' />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default DeleteTask
