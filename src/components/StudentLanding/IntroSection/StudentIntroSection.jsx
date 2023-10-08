import React from 'react'
import Style from './StudentIntroSection.module.scss'
import classNames from 'classnames'

const StudentIntroSection = () => {
    return (
        <div className={classNames(Style.main, 'col-12 text-center')}>
            <h2>Welcome</h2>
        </div>
    )
}

export default StudentIntroSection
