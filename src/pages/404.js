import DefaultLayout from 'components/layouts/defaultLayout';

export default function Custom404() {
  return (
    <DefaultLayout
      title="Beep, boop, beep, something went wrong. 🤖"
      button={{ title: 'Go back home', link: '/' }}
    ></DefaultLayout>
  );
}
