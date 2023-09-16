import { schema } from 'prosemirror-schema-basic';
import { EditorView } from '../../public-api';
import { EditorViewContext } from '../context/editorContext';
import {
  BoundCommand,
  ParamaterizedCommand,
  createCommandSet,
} from './boundCommand';

describe('BoundCommand', () => {
  let editorView: EditorView;

  beforeEach(() => {
    const context = new EditorViewContext({ schema });
    editorView = context.createEditor();
  });

  describe('can', () => {
    it('should return true when the command can be executed', () => {
      // Arrange
      const command: ParamaterizedCommand<number> = () => {
        // Mock the command logic
        return true;
      };
      const boundCommand = new BoundCommand(editorView, command);

      // Act
      const result = boundCommand.can(42);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when the command cannot be executed', () => {
      // Arrange
      const command: ParamaterizedCommand<number> = () => {
        // Mock the command logic
        return false;
      };
      const boundCommand = new BoundCommand(editorView, command);

      // Act
      const result = boundCommand.can(42);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('dispatch', () => {
    it('should execute the command with the given parameter', () => {
      // Arrange
      const command: ParamaterizedCommand<string> = () => {
        // Mock the command logic
        return true;
      };
      const boundCommand = new BoundCommand(editorView, command);

      // Act
      const result = boundCommand.dispatch('test');

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when the command fails to execute', () => {
      // Arrange
      const command: ParamaterizedCommand<string> = () => {
        // Mock the command logic
        return false;
      };
      const boundCommand = new BoundCommand(() => editorView, command);

      // Act
      const result = boundCommand.dispatch('test');

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('createCommandSet', () => {
    it('should create an actionSet with can and dispatch', () => {
      const command: ParamaterizedCommand<number> = () => {
        // Mock the command logic
        return false;
      };
      const actionSet = {
        a: new BoundCommand(editorView, command),
        b: new BoundCommand(editorView, command),
      };

      const result = createCommandSet(actionSet);

      expect(result.can.a(1, editorView)).toBe(false);
      expect(result.can.b(2)).toBe(false);
      expect(result.dispatch.a(3, editorView)).toBe(false);
      expect(result.dispatch.b(4)).toBe(false);
    });
  });
});
