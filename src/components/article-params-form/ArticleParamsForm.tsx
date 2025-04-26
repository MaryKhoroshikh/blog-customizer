import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { SyntheticEvent, useRef, useState } from 'react';
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
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedArticleState, setSelectedArticleState] =
		useState<ArticleStateType>(articleState);

	const handleChangeSelectedState = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setSelectedArticleState({ ...selectedArticleState, [key]: value });
	};
	const handleDefaultArticleState = () => {
		setSelectedArticleState(articleState);
	};

	const handleSubmitArticleState = (e: SyntheticEvent) => {
		e.preventDefault();
		setArticleState(selectedArticleState);
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose,
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
				ref={rootRef}>
				<form className={styles.form} onSubmit={handleSubmitArticleState}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Text as='label' size={12} weight={800} uppercase padding>
						Шрифт
						<Select
							selected={selectedArticleState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(options) =>
								handleChangeSelectedState('fontFamilyOption', options)
							}
						/>
					</Text>

					<RadioGroup
						name='fontSizeOptions'
						selected={selectedArticleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(options) =>
							handleChangeSelectedState('fontSizeOption', options)
						}
						title='Размер шрифта'
					/>

					<Text as='label' size={12} weight={800} uppercase padding>
						Цвет шрифта
						<Select
							selected={selectedArticleState.fontColor}
							options={fontColors}
							onChange={(options) =>
								handleChangeSelectedState('fontColor', options)
							}
						/>
					</Text>

					<Text padding>
						<Separator />
					</Text>

					<Text as='label' size={12} weight={800} uppercase padding>
						Цвет фона
						<Select
							selected={selectedArticleState.backgroundColor}
							options={backgroundColors}
							onChange={(options) =>
								handleChangeSelectedState('backgroundColor', options)
							}
						/>
					</Text>

					<Text as='label' size={12} weight={800} uppercase padding>
						Ширина контента
						<Select
							selected={selectedArticleState.contentWidth}
							options={contentWidthArr}
							onChange={(options) =>
								handleChangeSelectedState('contentWidth', options)
							}
						/>
					</Text>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleDefaultArticleState}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
