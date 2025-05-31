'use client'
import { JSX, useEffect, useState } from 'react'
import { AiOutlineArrowUp } from 'react-icons/ai'

const BackToTopButton = (): JSX.Element => {
    const [showBaxToTopButton, setShowBackToTopButton] = useState(false)

    useEffect(() => {
        document.addEventListener('scroll', () => setShowBackToTopButton(window.scrollY > 100))

        return () => document.removeEventListener('scroll', () => setShowBackToTopButton(window.scrollY > 100))
    }, [])

    return (
        <>
            {showBaxToTopButton ? (
                <button
                    style={{ borderRadius: '100%', zIndex: 1000 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-4 bg-green-500 text-white p-[16px] shadow-lg hover:bg-green-600 transition-opacity z-10 rounded-full"
                >
                    <AiOutlineArrowUp className="text-white text-2xl" />
                </button>
            ) : null}
        </>
    )
}

export default BackToTopButton;
