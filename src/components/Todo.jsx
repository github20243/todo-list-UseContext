import React, { useState, useContext } from "react";
import { MyContext } from "../context/Context";
import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import TodoForm from "./TodoForm";

function Todo({ onCloseUpdate, date, text, url, id }) {
	const { dispatch } = useContext(MyContext);
	const [showConfirm, setShowConfirm] = useState(false);
	const [progress, setProgress] = useState(0);
	const [isEditing, setIsEditing] = useState(false);

	const handleDeleteClick = () => {
		setShowConfirm(true);
	};

	const handleDeleteConfirm = () => {
		let interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					dispatch({ type: "DELETE", payload: id });
					return 100;
				}
				return prev + 10;
			});
		}, 100);
	};

	const handleDeleteCancel = () => {
		setShowConfirm(false);
	};

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleFormSubmit = (updatedData) => {
		dispatch({ type: "UPDATE", payload: updatedData });
		setIsEditing(false);
	};

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.3 }}>
				{isEditing ? (
					<TodoForm
						initialData={{ text, date, url, id }}
						onSubmit={handleFormSubmit}
						onClose={() => setIsEditing(false)}
					/>
				) : (
					<TodoContainer>
						<TodoText>{text}</TodoText>
						<TodoDate>{date}</TodoDate>
						<TodoImage src={url} alt="" />
						<ButtonContainer>
							<TodoButtonDelete onClick={handleDeleteClick}>
								Delete
							</TodoButtonDelete>
							<TodoButtonEdit onClick={handleEditClick}>
								Edit
							</TodoButtonEdit>
						</ButtonContainer>
					</TodoContainer>
				)}
			</motion.div>

			{showConfirm && (
				<ConfirmModal>
					<p>Are you sure you want to delete this task?</p>
					<ButtonContainer>
						<ConfirmButton onClick={handleDeleteConfirm}>Delete</ConfirmButton>
						<CancelButton onClick={handleDeleteCancel}>Cancel</CancelButton>
					</ButtonContainer>
					<ProgressContainer>
						<ProgressBar style={{ width: `${progress}%` }} />
					</ProgressContainer>
				</ConfirmModal>
			)}
		</>
	);
}

export default Todo;

const textAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

const TodoContainer = styled.div`
	width: 350px;
	max-width: 100%;
	border: 1px solid #ddd;
	border-radius: 15px;
	padding: 20px;
	margin: 20px auto;
	background: linear-gradient(145deg, #f0f0f0, #e0e0e0);
	box-shadow: 5px 5px 15px #ccc, -5px -5px 15px #fff;
	transition: transform 0.3s, box-shadow 0.3s;

	&:hover {
		transform: translateY(-10px);
		box-shadow: 10px 10px 20px #ccc, -10px -10px 20px #fff;
	}
`;

const TodoText = styled.p`
	font-size: 24px;
	font-weight: 700;
	color: #333;
	margin: 0 0 10px;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
	animation: ${textAnimation} 2s infinite;
	text-align: center;
`;

const TodoDate = styled.p`
	font-size: 18px;
	color: #666;
	margin: 0 0 10px;
	text-align: center;
`;

const TodoImage = styled.img`
	width: 150px;
	height: 150px;
	border-radius: 10px;
	object-fit: cover;
	margin-bottom: 10px;
	transition: transform 0.3s;
	margin-left: 109px;

	&:hover {
		transform: rotate(5deg) scale(1.1);
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const TodoButton = styled.button`
	padding: 10px 15px;
	border: none;
	border-radius: 30px;
	cursor: pointer;
	font-size: 14px;
	transition: background-color 0.3s, transform 0.3s;
	color: #fff;

	&:hover {
		transform: scale(1.1);
	}
`;

const TodoButtonDelete = styled(TodoButton)`
	background: linear-gradient(145deg, #ff5f6d, #ffc371);

	&:hover {
		background: linear-gradient(145deg, #ff3547, #ffac1c);
	}
`;

const TodoButtonEdit = styled(TodoButton)`
	background: linear-gradient(145deg, #42e695, #3bb2b8);

	&:hover {
		background: linear-gradient(145deg, #32d585, #2b92a8);
	}
`;

const ConfirmModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: #fff;
	border: 1px solid #ddd;
	border-radius: 10px;
	padding: 20px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	z-index: 1000;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
`;

const ConfirmButton = styled.button`
	padding: 10px 15px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	background: #ff5f6d;
	color: #fff;
	font-size: 14px;
	transition: background-color 0.3s;

	&:hover {
		background: #ff3547;
	}
`;

const CancelButton = styled.button`
	padding: 10px 15px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	background: #ccc;
	color: #333;
	font-size: 14px;
	transition: background-color 0.3s;

	&:hover {
		background: #bbb;
	}
`;

const ProgressContainer = styled.div`
	width: 100%;
	background: #f0f0f0;
	border-radius: 5px;
	overflow: hidden;
	height: 10px;
	margin-top: 10px;
`;

const ProgressBar = styled.div`
	height: 100%;
	background: #007bff;
	transition: width 0.1s ease-in-out;
`;
