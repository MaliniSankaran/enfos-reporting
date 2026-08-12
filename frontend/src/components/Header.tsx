interface HeaderProps {
    onGoHome: () => void;
    showBackButton: boolean;
}

function Header({ onGoHome, showBackButton }: HeaderProps) {
    return (
        <header>
            <h1 onClick={onGoHome} style={{ cursor: "pointer" }}>
                Enfos Reporting Portal
            </h1>
            {showBackButton && <button onClick={onGoHome}>Back to reports</button>}
        </header>
    );
}
export default Header;