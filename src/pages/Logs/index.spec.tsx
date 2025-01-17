import { render } from '@testing-library/react'
import FishLogs from '.'

jest.mock('react-router-dom')

describe('Logs page', () => {
  it('Should render TitlePage page', () => {
    const { getByText } = render(<FishLogs />)

    expect(getByText('Logs de Peixes')).toBeInTheDocument()
  })
})
