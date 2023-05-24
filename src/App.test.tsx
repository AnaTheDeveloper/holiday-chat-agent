import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import App from "./App";
import WelcomeScreen, { WelcomeScreenType } from "./pages/welcomeScreen";
import { testHolidayData } from "./utils/testHolidayData";
import Header from "./components/header";

const welcomeScreenFakeProps: WelcomeScreenType = {
  nameSetByUser: "bob",
  holidayData: testHolidayData,
  removeHolidayDataFileCallback: jest.fn(),
  handleChatHistoryCallback: jest.fn((testChatGiven) => {
    console.log("callback done");
  }),
  resetChatHistoryCallback: jest.fn(),
};

describe("App", () => {
  test("the start screen title and subtitle renders", () => {
    render(<App />);

    expect(screen.getByText(/lets get started!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/please enter your name and upload a file/i)
    ).toBeInTheDocument();
  });

  test("a user can input their name", async () => {
    render(<App />);

    let nameInput = screen.getByTestId("nameInput-test");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      fireEvent.change(nameInput, {
        target: { value: "ana" },
      });
    });
    let inputtedName = screen.getByTestId("nameInput-test") as HTMLInputElement;

    expect(screen.getByText(/what is your name\?/i)).toBeInTheDocument();
    expect(inputtedName.value).toBe("ana");
  });

  test("a user can upload a .csv file", async () => {
    const file = new File(["holidayData"], "hollidayData.csv", { type: "csv" });

    render(<App />);

    let input = screen.getByTestId("fileUpload-test");

    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.change(input, {
        target: { files: [file] },
      });
    });

    let uploadedFile = screen.getByTestId(
      "fileUpload-test"
    ) as HTMLInputElement;

    expect(screen.getByText(/upload holiday csv file!/i)).toBeInTheDocument();
    expect(uploadedFile.files![0].name).toBe("hollidayData.csv");
    expect(uploadedFile.files!.length).toBe(1);
  });

  test("the chat history initially renders with no chat", async () => {
    render(<App />);

    expect(
      screen.getByTestId("chatHistoryInitialTitle-test")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("chatHistoryInitialSubTitle-test")
    ).toBeInTheDocument();
  });
});

describe("Header", () => {
  test("Header Renders", async () => {
    render(<Header />);
    expect(screen.getByText(/first holiday ltd/i)).toBeInTheDocument();
    expect(screen.getByText(/holiday chat agent/i)).toBeInTheDocument();
  });
});

describe("Welcome Screen", () => {
  test("Welcome Screen Renders", () => {
    render(<WelcomeScreen {...welcomeScreenFakeProps} />);

    expect(screen.getByText(/welcome bob!/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /get ready for an exhilarating and unforgettable adventure that is customized just for you - we're thrilled to make it happen!/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /choose a new file/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });

  test("next button can be clicked and moves onto first question", () => {
    render(<WelcomeScreen {...welcomeScreenFakeProps} />);

    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    expect(
      screen.getByText(/what is your budget per night\?/i)
    ).toBeInTheDocument();
  });

  test("user can complete budget question and click next", () => {
    render(<WelcomeScreen {...welcomeScreenFakeProps} />);

    //Go to budget question
    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    const questionInput = screen.getByRole("textbox");

    fireEvent.change(questionInput, { target: { value: "100" } });

    const usersInput = screen.getByRole("textbox") as HTMLInputElement;

    expect(usersInput.value).toBe("100");

    //Go to next question
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
  });

  test("user cannot move to temperature question if no budget input was given", () => {
    render(<WelcomeScreen {...welcomeScreenFakeProps} />);

    //Go to temperature question
    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    expect(screen.getByTestId("errorMessage-test")).toBeInTheDocument();
  });

  test("user can complete the set of questions and display results", () => {
    render(<WelcomeScreen {...welcomeScreenFakeProps} />);

    //Go to budget question
    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    //complete budget question
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "100" } });

    //Go to temperature question
    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    //Complete temperature question
    fireEvent.click(screen.getByLabelText("mild"));
    expect(screen.getByLabelText("mild")).toBeChecked();

    //Go to star question
    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    //Complete star question
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "3" } });

    //Go to results
    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    //Results table renders
    expect(screen.getByRole("table")).toBeInTheDocument();

    //Table Headers render
    expect(screen.getByRole("columnheader", {name: /location/i})).toBeInTheDocument();
    expect(screen.getByRole("columnheader", {name: /temperature/i})).toBeInTheDocument();
    expect(screen.getByRole("columnheader", {name: /hotel/i})).toBeInTheDocument();
    expect(screen.getByRole("columnheader", {name: /price per night/i})).toBeInTheDocument();
    expect(screen.getByRole("columnheader", {name: /star rating/i})).toBeInTheDocument();

    //Table row renders with data
    expect(screen.getByRole('row', {name: /rome mild winevalley £25 5 stars/i})).toBeInTheDocument();
    expect(screen.getByRole('row', {name: /waikato mild forestretreat £89 4 stars/i})).toBeInTheDocument();
    expect(screen.getByRole('row', {name: /new york mild applecity £27 3 stars/i})).toBeInTheDocument();

    //Start again button renders
    expect(
      screen.getByRole("button", { name: /start again/i })
    ).toBeInTheDocument();

    //Download Holiday Recomendations button renders
    expect(
      screen.getByRole("link", { name: /download holiday recomendations/i })
    ).toBeInTheDocument();
  });
});
