import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TodoForm = ({ initialData, onSubmit, onClose }) => {
	const [text, setText] = useState(initialData?.text || "");
	const [date, setDate] = useState(initialData?.date || "");
	const [url, setUrl] = useState(initialData?.url || "");

	useEffect(() => {
		if (initialData) {
			setText(initialData.text);
			setDate(initialData.date);
			setUrl(initialData.url);
		}
	}, [initialData]);

	const submitHandler = (e) => {
		e.preventDefault();
		const newValue = {
			text,
			date,
			url,
			id: initialData?.id || Math.floor(Math.random() * 10000),
		};
		onSubmit(newValue);
		setDate("");
		setText("");
		setUrl("");
	};

	return (
		<Container>
			<Form onSubmit={submitHandler}>
				<Cancel onClick={onClose}>X</Cancel>
				<Label htmlFor="text">
					Enter your text
					<Input
						type="text"
						id="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
						required
					/>
				</Label>
				<Label htmlFor="date">
					Enter your date
					<Input
						type="date"
						id="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						required
					/>
				</Label>
				<Label htmlFor="url">
					Enter your img
					<Input
						type="url"
						id="url"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						required
					/>
				</Label>
				<BlockButton>
					<Button type="submit">Create</Button>
						<Button type="button" onClick={onClose}>Cancel</Button>
				</BlockButton>
			</Form>
		</Container>
	);
};

export default TodoForm;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	background: #fff;
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	width: 100%;
	max-width: 400px;
`;

const Label = styled.label`
	margin-bottom: 10px;
	font-weight: 700;
	color: #333;
`;

const Input = styled.input`
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
	width: 100%;
	margin-top: 5px;
`;

const Button = styled.button`
	padding: 10px;
	border: none;
	border-radius: 5px;
	color: #fff;
	background: #007bff;
	cursor: pointer;
	font-size: 16px;
	transition: background 0.3s;

	&:hover {
		background: #0056b3;
	}
`;

const Cancel = styled.button`
	background: #f0f0f0;
	color: #333;
	border: none;
	cursor: pointer;
	font-size: 18px;
	position: absolute;
	top: 10px;
	right: 10px;
`;

const BlockButton = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
`;
