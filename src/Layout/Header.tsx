import styled from "styled-components";
import icons from "../assets/icons/jira.png";
import Modal from "../components/UI/Modal";
const Header = () => {
	return (
		<DivJira>
			<LeftSection>
				<img src={icons} alt="Jira" />
				<h1>Jira</h1>
			</LeftSection>
			<Menu>
				<MenuItem>Ваша работа</MenuItem>
				<MenuItem>Проекты</MenuItem>
				<MenuItem>Фильтры</MenuItem>
				<MenuItem>Дашборды</MenuItem>
				<MenuItem>Команды</MenuItem>
				<MenuItem>Планы</MenuItem>
				<MenuItem>Еще</MenuItem>
			</Menu>
			<RightSection>
				<Modal>Создать</Modal>
				<DaysLeft>🌟Осталось 29 дней</DaysLeft>
				<SearchInput type="text" placeholder="Поиск" />
				<Icons>
					<UserIcon>S</UserIcon>
					<Icon>⚙️</Icon>
				</Icons>
			</RightSection>
		</DivJira>
	);
};

export default Header;

const DivJira = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 97%;
	padding: 0 20px;
	background-color: #fff;
	border-bottom: 1px solid #ccc;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	position: fixed;
`;

const LeftSection = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;

	img {
		width: 24px;
		height: 24px;
	}

	h1 {
		margin-left: 8px;
		font-size: 18px;
		font-weight: bold;
		color: #0052cc;
	}
`;

const SearchInput = styled.input`
	width: 180px;
	height: 30px;
	border-radius: 5px;
	margin-left: 20px;
`;

const Menu = styled.div`
	display: flex;
	align-items: center;
	flex-grow: 1;
	justify-content: center;
`;

const MenuItem = styled.div`
	margin: 0 10px;
	font-size: 17px;
	color: #172b4d;
	cursor: pointer;

	&:hover {
		color: #0052cc;
	}
`;

const RightSection = styled.div`
	display: flex;
	align-items: center;
`;

const DaysLeft = styled.div`
	margin-left: 20px;
	padding: 4px 8px;
	border: 1px solid #ccc;
	border-radius: 3px;
	font-size: 18px;
	color: #0052cc;
`;

const Icons = styled.div`
	display: flex;
	align-items: center;
	margin-left: 20px;
`;

const Icon = styled.div`
	margin: 0 10px;
	font-size: 18px;
	cursor: pointer;
`;

const UserIcon = styled.div`
	width: 30px;
	height: 30px;
	border-radius: 50%;
	font-size: 25px;
	color: #fff;
	text-align: center;
	background-color: brown;
	cursor: pointer;
`;
