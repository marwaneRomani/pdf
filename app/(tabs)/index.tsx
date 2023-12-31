import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { StyleSheet, SafeAreaView, Button } from "react-native";
import Pdf from "react-native-pdf";

import { printToFileAsync } from "expo-print";

export default function App() {
  const onlineSource = {
    uri: "http://samples.leanpub.com/thereactnativebook-sample.pdf",
    cache: true,
  };
  const [pdfSource, setPdfSource] = useState(onlineSource);
  const pdfRef = useRef();

  const generatePdf = async (generateBase64: boolean) => {
    const html = `
      <html>
        <body style="margin:32px;">
          <h1>Hi YouTube</h1>
          <h2>Base64: ${generateBase64.toString()}</h2>
        </body>
      </html>
    `;

    const fileGenerated = await printToFileAsync({
      html: html,
      base64: generateBase64,
    });

    console.log(fileGenerated.base64);
    console.log(fileGenerated.uri);

    const newSource = {
      uri: generateBase64
        ? `data:application/pdf;base64,${fileGenerated.base64}`
        : fileGenerated.uri,
      cache: true,
    };
    setPdfSource(newSource);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Button title="Change Page" onPress={() => pdfRef.current.setPage(18)} /> */}

      <Button
        title="Show Online PDF"
        onPress={() => setPdfSource(onlineSource)}
      />
      <Button title="Generate and Show" onPress={() => generatePdf(false)} />
      <Button
        title="Generate and Show Base64"
        onPress={() => generatePdf(true)}
      />

      <Pdf
        trustAllCerts={false}
        source={onlineSource}
        // ref={pdfRef}
        // source={pdfSource}
        // onLoadComplete={(numberOfPages, filePath) => {
        //   console.log(`Number of pages: ${numberOfPages}`);
        // }}
        // onPageChanged={(page, numberOfPages) => {
        //   console.log(`Current page: ${page}`);
        // }}
        // onError={(error) => {
        //   console.log(error);
        // }}
        // onPressLink={(uri) => {
        //   console.log(`Link pressed: ${uri}`);
        // }}
        // style={styles.pdf}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 32,
  },
  pdf: {
    flex: 1,
    alignSelf: "stretch",
  },
});
