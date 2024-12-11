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
  HomeIcon,
  OrderFilledIcon,
  ProductFilledIcon,
  PersonFilledIcon,
  ContentFilledIcon,
  BankFilledIcon,
  ChartVerticalFilledIcon,
  TargetFilledIcon,
  DiscountFilledIcon,
  MarketsFilledIcon,
  WandIcon,
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
    <Navigation location="/polaris-studio">
      <Navigation.Section
        items={[
          {
            url: '/',
            label: 'Home',
            selected: false,
            icon: HomeIcon,
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
            url: '/marketing',
            label: 'Marketing',
            icon: TargetFilledIcon,
          },
          {
            url: '/discounts',
            label: 'Discounts',
            icon: DiscountFilledIcon,
          },
          {
            url: '/content',
            label: 'Content',
            icon: ContentFilledIcon,
          },
          {
            url: '/markets',
            label: 'Markets',
            icon: MarketsFilledIcon,
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
        ]}
      />
      <Navigation.Section
        title="Apps"
        items={[
          {
            url: '/polaris-studio',
            label: 'Polaris Studio',
            selected: true,
            icon: WandIcon,
            subNavigationItems: [
              {
                url: '/polaris-studio/page-1',
                label: 'Page 1',
              },
            ],
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
