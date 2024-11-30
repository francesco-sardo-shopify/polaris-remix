import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import '@shopify/polaris/build/esm/styles.css';
import { AppProvider } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { Frame, TopBar, Navigation } from '@shopify/polaris';
import {
  HomeFilledIcon,
  OrderFilledIcon,
  ProductFilledIcon,
  PersonFilledIcon,
  ContentFilledIcon,
  BankFilledIcon,
  ChartVerticalFilledIcon,
  TargetFilledIcon,
  DiscountFilledIcon,
  GlobeFilledIcon,
} from '@shopify/polaris-icons';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function App() {
  const location =
    typeof window !== 'undefined' ? window.location.pathname : '';

  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            url: '/',
            label: 'Home',
            icon: HomeFilledIcon,
          },
          {
            url: '/orders',
            label: 'Orders',
            icon: OrderFilledIcon,
          },
          {
            url: '/products',
            label: 'Products',
            icon: ProductFilledIcon,
          },
          {
            url: '/customers',
            label: 'Customers',
            icon: PersonFilledIcon,
          },
          {
            url: '/content',
            label: 'Content',
            icon: ContentFilledIcon,
          },
          {
            url: '/finance',
            label: 'Finance',
            icon: BankFilledIcon,
          },
          {
            url: '/analytics',
            label: 'Analytics',
            icon: ChartVerticalFilledIcon,
          },
          {
            url: '/marketing',
            label: 'Marketing',
            icon: TargetFilledIcon,
          },
          {
            url: '/discounts',
            label: 'Discounts',
            icon: DiscountFilledIcon,
          },
        ]}
      />
      <Navigation.Section
        title="Sales Channels"
        items={[
          {
            url: '/my-app',
            selected: location.startsWith('/my-app'),
            label: 'Generic App',
            icon: ChartVerticalFilledIcon,
            subNavigationItems: [
              {
                url: '/my-app/page-1',
                label: 'Page 1',
              },
              {
                url: '/my-app/page-2',
                label: 'Page 2',
              },
            ],
          },
          {
            url: '/online-store',
            label: 'Online Store',
            icon: GlobeFilledIcon,
          },
        ]}
      />
    </Navigation>
  );

  return (
    <AppProvider i18n={{}}>
      <Frame
        topBar={topBarMarkup}
        navigation={navigationMarkup}
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigationActive}
      >
        <Outlet />
      </Frame>
    </AppProvider>
  );
}

export default App;
