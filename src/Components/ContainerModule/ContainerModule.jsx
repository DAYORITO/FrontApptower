import React, { useState } from 'react'
import { Dropdown } from '../Dropdown/Dropdown'
import "./ContainerModule.css"

export const ContainerModule = ({ children, icon = "home", name, date1, date2, status }) => {

    const [isDropdownOpen, setDropdownOpen] = useState(false)

    const toggleDropdown = () => {

        setDropdownOpen(!isDropdownOpen)
    }

    return (
        <div class="card shadow container-module card-header-details w-100">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-4 col-md-2 text-center " >
                        <div class="circle circle-lg bg-white">
                            <span class={`fe fe-${icon} fe-24 text-grey`}></span>
                        </div>
                    </div>
                    <div class="col ml-4">
                        <strong class="mb-1">{name}</strong><span class={`dot dot-lg bg-${(status === "Active") ? "success" : "damger"} ml-2`}></span>
                        <br /><span className="badge badge-light text-secondary">{date1}</span>
                        <span className="badge badge-light text-secondary">{date2}</span>
                        {/* <p class="small text-muted mb-1">Fringilla Ornare Placerat Consulting</p> */}
                    </div>


                    <Dropdown isDropdownOpen={isDropdownOpen} toggleDropdown={toggleDropdown}>

                        {children}

                        
                    </Dropdown>
                </div>
            </div>
        </div>)
}
