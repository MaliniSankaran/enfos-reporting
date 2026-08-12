import { AppBar, Toolbar, Typography, Button } from "@mui/material";

interface HeaderProps {
    onGoHome: () => void;
    showBackButton: boolean;
}

function Header({ onGoHome, showBackButton }: HeaderProps) {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    onClick={onGoHome}
                    className="clickable"
                    sx={{ cursor: "pointer", flexGrow: 1 }}
                >
                    Enfos Reporting Portal
                </Typography>
                {showBackButton && (
                    <Button color="inherit" onClick={onGoHome}>
                        Back to Reports
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;