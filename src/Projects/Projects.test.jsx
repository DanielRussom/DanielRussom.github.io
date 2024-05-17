import { render, screen } from "@testing-library/react";
import Projects from "./Projects";
import ProjectReader from "./ProjectReader";

jest.mock("./ProjectReader")

jest.mock("./ProjectCard", () => {
  return {
      default: jest.fn().mockImplementation(() => {
          return <span data-testid="project" />;
      })
  };
});

describe('Projects should', () => {
  beforeEach(() => {
    ProjectReader.prototype.get = jest.fn();
  });

  it('render a title', () => {
    render(<Projects/>);

    expect(screen.getByText("Projects")).toBeVisible();
  });

  it('get all projects', () => {
    let getProjects = jest.fn();
    ProjectReader.prototype.get = getProjects;
    
    render(<Projects/>);

    expect(getProjects).toBeCalledTimes(1);
  });

  it('render one project', () => {
    let getProjects = jest.fn();
    ProjectReader.prototype.get = getProjects;
    
    render(<Projects/>);

    expect(screen.getByTestId("project")).toBeVisible();
  });
});