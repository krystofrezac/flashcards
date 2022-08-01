import React, { useMemo } from 'react';
import { RouterContext, BlitzRouter, BlitzProvider } from 'blitz';
import { render as defaultRender } from '@testing-library/react';
import { renderHook as defaultRenderHook } from '@testing-library/react-hooks';

export * from '@testing-library/react';

export const mockRouter: BlitzRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  params: {},
  query: {},
  isReady: true,
  isLocaleDomain: false,
  isPreview: false,
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
};

// --------------------------------------------------------------------------------
// This file customizes the render() and renderHook() test functions provided
// by React testing library. It adds a router context wrapper with a mocked router.
//
// You should always import `render` and `renderHook` from this file
//
// This is the place to add any other context providers you need while testing.
// --------------------------------------------------------------------------------

// --------------------------------------------------
// render()
// --------------------------------------------------
// Override the default test render with our own
//
// You can override the router mock like this:
//
// const { baseElement } = render(<MyComponent />, {
//   router: { pathname: '/my-custom-pathname' },
// });
// --------------------------------------------------
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const render = (
  ui: RenderUI,
  { wrapper, router, dehydratedState, ...options }: RenderOptions = {},
) => {
  let NewWrapper = wrapper;
  if (!wrapper) {
    // Add a default context wrapper if one isn't supplied from the test
    NewWrapper = (props: React.PropsWithChildren<{}>): JSX.Element => {
      const providerValue = useMemo(() => ({ ...mockRouter, ...router }), []);
      return (
        <BlitzProvider dehydratedState={dehydratedState}>
          <RouterContext.Provider value={providerValue}>
            {props.children}
          </RouterContext.Provider>
        </BlitzProvider>
      );
    };
  }
  return defaultRender(ui, { wrapper: NewWrapper, ...options });
};

// --------------------------------------------------
// renderHook()
// --------------------------------------------------
// Override the default test renderHook with our own
//
// You can override the router mock like this:
//
// const result = renderHook(() => myHook(), {
//   router: { pathname: '/my-custom-pathname' },
// });
// --------------------------------------------------
export const renderHook = (
  hook: RenderHook,
  { wrapper, router, dehydratedState, ...options }: RenderHookOptions = {},
): RenderHookOptions => {
  let NewWrapper = wrapper;
  if (!wrapper) {
    // Add a default context wrapper if one isn't supplied from the test
    NewWrapper = (props: React.PropsWithChildren<{}>): JSX.Element => {
      const providerValue = useMemo(() => ({ ...mockRouter, ...router }), []);
      return (
        <BlitzProvider dehydratedState={dehydratedState}>
          <RouterContext.Provider value={providerValue}>
            {props.children}
          </RouterContext.Provider>
        </BlitzProvider>
      );
    };
  }
  return defaultRenderHook(hook, { wrapper: NewWrapper, ...options });
};

type DefaultParams = Parameters<typeof defaultRender>;
type RenderUI = DefaultParams[0];
type RenderOptions = Omit<DefaultParams[1], 'wrapper'> & {
  router?: Partial<BlitzRouter>;
  dehydratedState?: unknown;
  wrapper?: React.ComponentType<{ children?: React.ReactNode }>;
};

type DefaultHookParams = Parameters<typeof defaultRenderHook>;
type RenderHook = DefaultHookParams[0];
type RenderHookOptions = Omit<DefaultHookParams[1], 'wrapper'> & {
  router?: Partial<BlitzRouter>;
  dehydratedState?: unknown;
  wrapper?: React.ComponentType<{ children?: React.ReactNode }>;
};
