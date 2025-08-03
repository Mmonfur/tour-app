import './Header.css';

const imagePath = "/hill.png";

export default function Header() {
	return (
		<header>
			<div style={{ display: "flex", alignItems:"end",  justifyContent: "center", gap: "15px" }}>
				<h1>Kilátás Pestről</h1>
				<img src={imagePath} alt="Hill" style={{ width: "100px", height: "auto" }} />
			</div>
			<div className="subtitle">Gyalogtúrák Pest megyében a természet szerelmeseinek</div>
		</header>
	);
}
