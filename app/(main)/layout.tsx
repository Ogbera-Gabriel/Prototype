import Box from "@mui/material/Box";
import { Toaster } from "react-hot-toast";

const MainLayout = ({ children }: { children: React.ReactNode}) =>
{
    return (
        <Box sx={{height: "100%", width: "100%"}}> 
            {children}
            <Toaster position="top-center"/>
        </Box>
    )
}

export default MainLayout