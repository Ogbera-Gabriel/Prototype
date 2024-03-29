import Box from "@mui/material/Box"

const MainLayout = ({ children }: { children: React.ReactNode}) =>
{
    return (
        <Box sx={{height: "100%", width: "100%"}}> 
            {children}
        </Box>
    )
}

export default MainLayout