import styles from './Select2.module.css'
import { useCallback, useEffect, useRef, useState } from "react";

export function Select2({ value, options, identifier, errors, onChange, placeholder, className, voidmessage = "No hay datos", required = true }) {

    const [isOpen, setIsOpen] = useState(false)
    const [highLightedIndex, setHighLightedIndex] = useState(0)
    const [search, setSearch] = useState('')
    const containerRef = useRef(null)
    const [errorMessageToShow, setErrorMessageToShow] = useState(null);

    const clearOptions = () => onChange(undefined)

    const isOptionSelected = (option) => value?.value === option.value

    {
        if (options.length === 0) {
            options = [{ label: voidmessage, value: '' }]
        }
    }
    let optionsFiltered = []

    if (search !== '') {
        optionsFiltered = options.filter(option => {
            return option?.label.toLowerCase().includes(search.toLowerCase())
        })
    } else {
        optionsFiltered = options
    }

    const selectOption = useCallback((option) => {
        if (option !== value) {
            onChange(option)
        }
        else {
            onChange(undefined)
        }
    }, [value, onChange, optionsFiltered])

    const toggleIsOpen = () => {
        setSearch('')
        setIsOpen(prev => !prev)
    }
    const organizarErrores = () => {
        if (errors) {
            return errors?.errors?.reduce((a, b) => {
                a[b.field] = b.message;
                if (b.field === identifier) {
                    className = "border boder-danger";
                }
                return a;
            }, {})
        }
    }

    useEffect(() => {
        if (errors) {
            setErrorMessageToShow(organizarErrores());
        }
        console.log("errors en el input:", errors)

    }, [errors])

    useEffect(() => {
        setHighLightedIndex(0)
    }, [isOpen]);

    useEffect(() => {
        const handler = (e) => {
            if (e.target != containerRef.current) return;
            switch (e.code) {
                case "Enter":
                case "Space":
                    setIsOpen(prev => !prev);
                    if (isOpen) selectOption(options[highLightedIndex])
                    break;
                case "ArrowUp":
                case "ArrowDown": {
                    if (!isOpen) {
                        setIsOpen(true);
                        break;
                    }
                    const newValue = highLightedIndex + (e.code === "ArrowUp" ? -1 : 1);
                    if (newValue < 0 || newValue >= options.length) return;
                    setHighLightedIndex(newValue);
                    break;
                }
                case "Escape":
                    setIsOpen(false);
                    break;
            }
        }

        containerRef.current?.addEventListener('keydown', handler);
        return () => {
            containerRef.current?.removeEventListener('keydown', handler);
        }
    }, [isOpen, highLightedIndex, options, selectOption]);

    return (
        <>

            <div
                onBlur={(e) => {
                    if (e.relatedTarget === null) {
                        setSearch('')
                        setIsOpen(false)
                    }
                }}
                onClick={toggleIsOpen}
                className={`${styles.container} ${className} ${errorMessageToShow != null && errorMessageToShow[identifier] != null ? "border-danger" : "mb-3"}`}
                ref={containerRef}
                tabIndex={0}
            >
                <span className={styles.borderAnimation}></span>
                <div className={`${styles.label} ${value ? styles.label__active : ''}`}>
                    {required ? `${placeholder} *` : placeholder || ''}
                </div>
                <span className={`${styles.value}`}>
                    {value?.label}
                </span>
                {
                    value && (
                        <button className={`${styles.clear__button}`} onClick={e => {
                            e.stopPropagation();
                            clearOptions();
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </button>
                    )
                }
                <div className={`${styles.caret} ${isOpen ? styles.caret__active : ''}`}>
                    {value ? null : <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9" /></svg>}
                </div>
                <ul className={`${styles.options} ${isOpen ? styles.options__show : ''}`}>
                    <div className={`${styles.inputContainer}`} onClick={e => e.stopPropagation()} onFocus={() => setIsOpen(true)}>
                        <input className={`${styles.input} form-control`} type="text" value={search} onChange={e => {
                            setSearch(e.target.value)
                            setIsOpen(false)
                            setIsOpen(true)
                        }}

                        />
                    </div>
                    {
                        optionsFiltered?.map((option, index) => (
                            <li
                                key={index}
                                onClick={e => {
                                    e.stopPropagation();
                                    selectOption(option);
                                    toggleIsOpen();
                                }}
                                onMouseEnter={() => setHighLightedIndex(index)}
                                className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ''} ${index === highLightedIndex ? styles.highlighted : ''}`}
                            >
                                {option.label}
                            </li>
                        ))
                    }
                </ul>

            </div>
            {errors && errorMessageToShow != null &&
                <div className="error-message text-right" style={{ color: 'red', fontSize: '9px', paddingTop: '1.4px' }}>{errorMessageToShow[identifier]}</div>}


        </>

    );
}
export default Select2;