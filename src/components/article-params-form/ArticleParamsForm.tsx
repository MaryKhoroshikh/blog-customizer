import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	setArticleState: (data: ArticleStateType) => void;
	onClose?: () => void;
}

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
	onClose,
}: ArticleParamsFormProps) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [selectedArticleState, setSelectedArticleState] =
		useState<ArticleStateType>(articleState);

	const handleChangeSelectedState = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setSelectedArticleState({ ...selectedArticleState, [key]: value });
	};
	const handleResetArticleState = () => {
		setSelectedArticleState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const handleSubmitArticleState = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(selectedArticleState);
	};

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef,
		onClose,
		onChange: setIsSidebarOpen,
	});

	return (
		<>
			<ArrowButton
				isOpen={isSidebarOpen}
				onClick={() => {
					setIsSidebarOpen(!isSidebarOpen);
				}}
			/>
			<aside
				className={clsx(
					styles.container,
					isSidebarOpen && styles.container_open
				)}
				ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmitArticleState}
					onReset={handleResetArticleState}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={selectedArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(options) =>
							handleChangeSelectedState('fontFamilyOption', options)
						}
					/>

					<RadioGroup
						name='fontSizeOptions'
						selected={selectedArticleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(options) =>
							handleChangeSelectedState('fontSizeOption', options)
						}
						title='Размер шрифта'
					/>

					<Select
						title='Цвет шрифта'
						selected={selectedArticleState.fontColor}
						options={fontColors}
						onChange={(options) =>
							handleChangeSelectedState('fontColor', options)
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={selectedArticleState.backgroundColor}
						options={backgroundColors}
						onChange={(options) =>
							handleChangeSelectedState('backgroundColor', options)
						}
					/>

					<Select
						title='Ширина контента'
						selected={selectedArticleState.contentWidth}
						options={contentWidthArr}
						onChange={(options) =>
							handleChangeSelectedState('contentWidth', options)
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
