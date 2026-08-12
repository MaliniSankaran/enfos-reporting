import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface HeaderProps {
    onGoHome: () => void;
    showBackButton: boolean;
}

function Header({ onGoHome, showBackButton }: HeaderProps) {
    return (
        <AppBar position="static">
            <Toolbar sx={{ px: 3 }}>
                {showBackButton && (
                    <IconButton color="inherit" onClick={onGoHome} sx={{ mr: 1 }}>
                        <ArrowBackIcon />
                    </IconButton>
                )}
                <Typography variant="h6" onClick={onGoHome} sx={{ cursor: "pointer" }}>
                    Enfos Reporting Portal
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;