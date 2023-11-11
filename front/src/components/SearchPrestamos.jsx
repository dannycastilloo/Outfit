import { ButtonRegister } from "./ButtonRegister"
import React, { useState, useRef, useEffect } from 'react'
import { RegisterPrestamo } from "./RegisterPrestamo"

export const SearchPrestamos = ({ prestamos, setFilteredPrestamos }) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target) && isModalOpen) {
                closeModal();
            }
        };

        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);

    useEffect(() => {
        if (Array.isArray(prestamos)) {
            // Filtra los préstamos basados en el valor de búsqueda
            const filteredPrestamos = prestamos.filter((prestamo) => {
                return prestamo.NombreCliente.toLowerCase().includes(searchValue.toLowerCase());
            });
            setFilteredPrestamos(filteredPrestamos);
        }
    }, [searchValue, prestamos, setFilteredPrestamos]);
    

    return (
        <>
            <div className="filter-table">
                <form className="d-flex filter-pc" role="search">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Buscar por cliente, estado u otros"
                        aria-label="Search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </form>
                <button className="filtros">
                    <img src="../src/assets/Filter.svg" alt="Filtros" />
                    Filtros
                </button>
                <ButtonRegister onClick={openModal} />
            </div>

            {isModalOpen && (
                <>
                    <div className="modal-background"></div>
                    <div className="modal-overlay">
                        <div className="modal-container" ref={modalRef}>
                            <RegisterPrestamo closeModal={closeModal} />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
