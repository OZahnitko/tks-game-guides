import {
  MapControlsModule,
  MapModule,
  ProgressionModule,
  WalkthroughModule,
} from "@modules";

import { RootWrapper, Underlay as UND } from "./Styles";

const App = () => {
  return (
    <RootWrapper>
      {false && <Underlay />}
      <MapModule />
      <MapControlsModule />
      <ProgressionModule />
      <WalkthroughModule />
    </RootWrapper>
  );
};

export default App;

const Underlay = () => (
  <UND.Wrapper>
    <UND.Child />
    <UND.Child />
    <UND.Child />
    <UND.Child />
    <UND.Child />
    <UND.Child />
    <UND.Child />
    <UND.Child />
    <UND.Child />
    <UND.Child />
    <UND.Child />
    <UND.Child />
  </UND.Wrapper>
);
