import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Fetch from '../fetch'

const server = setupServer(
    rest.get('/greeting', (req, res, ctx) => {
        return res(ctx.json({greeting: 'hello there'}))
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays greeting', async () => {
    render(<Fetch url="/greeting" />)

    fireEvent.click(screen.getByText('Load Greeting'))

    await waitFor(() => screen.getByRole('heading'))

    expect(screen.getByRole('heading')).oHaveTextContent('hello there')
    expect(screen.getByRole('button')).toBeDisabled()
})
