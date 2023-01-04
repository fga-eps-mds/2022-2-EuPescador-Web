import { render, screen, waitFor } from '@testing-library/react'
import renderer from 'react-test-renderer';
import Home from './Home'

jest.mock('react-router-dom')


beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => JSON.stringify({ admin: 'isAdmin' })),
        setItem: jest.fn(() => null),
      },
      writable: true,
    })
  })

describe('Home page', () => {

  const functions = require('./Home.tsx');

  it('Should render page', () => {
    const { getByText } = render(<Home />)

    expect(getByText('Mapa')).toBeInTheDocument()
  })

  it('The map element must render', () => {
    render(<Home />)

    const element = document.getElementsByClassName('mapaContainer')
    expect(element).not.toBeNull()
  })

})
