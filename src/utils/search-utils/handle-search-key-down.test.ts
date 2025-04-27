import { KeyboardButtonName } from '@/const/const';
import { handleSearchKeyDown } from './handle-search-key-down';
import { generateAllCameras } from '../mock/mock';

describe('handleSearchKeyDown', () => {
  const setActiveIndex = vi.fn();
  const filteredCameras = generateAllCameras(5);
  let activeIndex: number | null = 0;
  const handleClick = vi.fn();

  it('should call setActiveIndex with correct value on ArrowDown', () => {
    const event = {
      key: KeyboardButtonName.ArrowDown,
      preventDefault: vi.fn(),
    } as unknown as React.KeyboardEvent<HTMLInputElement>;

    handleSearchKeyDown({
      e: event,
      filteredCameras,
      activeIndex,
      setActiveIndex,
      handleClick,
    });

    expect(setActiveIndex).toHaveBeenCalledWith(1);
  });

  it('should call setActiveIndex with correct value on ArrowUp', () => {
    const event = {
      key: KeyboardButtonName.ArrowUp,
      preventDefault: vi.fn(),
    } as unknown as React.KeyboardEvent<HTMLInputElement>;

    handleSearchKeyDown({
      e: event,
      filteredCameras,
      activeIndex: 1,
      setActiveIndex,
      handleClick,
    });

    expect(setActiveIndex).toHaveBeenCalledWith(0);
  });

  it('should call setActiveIndex with correct value on Tab key', () => {
    const event = {
      key: KeyboardButtonName.Tab,
      preventDefault: vi.fn(),
      shiftKey: false,
    } as unknown as React.KeyboardEvent<HTMLInputElement>;

    handleSearchKeyDown({
      e: event,
      filteredCameras,
      activeIndex,
      setActiveIndex,
      handleClick,
    });

    expect(setActiveIndex).toHaveBeenCalledWith(1);
  });

  it('should call handleClick when Enter key is pressed', () => {
    const event = {
      key: KeyboardButtonName.Enter,
      preventDefault: vi.fn(),
    } as unknown as React.KeyboardEvent<HTMLInputElement>;

    handleSearchKeyDown({
      e: event,
      filteredCameras,
      activeIndex,
      setActiveIndex,
      handleClick,
    });

    if (activeIndex !== null) {
      expect(handleClick).toHaveBeenCalledWith(filteredCameras[activeIndex].id);
    }
  });


  it('should set activeIndex to null when Shift is pressed and activeIndex is DefaultParam.ZeroIndex', () => {
    activeIndex = 0;

    const event = {
      key: KeyboardButtonName.Tab,
      shiftKey: true,
      preventDefault: vi.fn(),
    } as unknown as React.KeyboardEvent<HTMLInputElement>;

    handleSearchKeyDown({
      e: event,
      filteredCameras,
      activeIndex,
      setActiveIndex,
      handleClick,
    });

    expect(setActiveIndex).toHaveBeenCalledWith(null);
  });

  it('should set activeIndex to filteredCameras.length when Shift is not pressed and activeIndex is maxIndex', () => {
    activeIndex = filteredCameras.length - 1;

    const event = {
      key: KeyboardButtonName.Tab,
      shiftKey: false,
      preventDefault: vi.fn(),
    } as unknown as React.KeyboardEvent<HTMLInputElement>;

    handleSearchKeyDown({
      e: event,
      filteredCameras,
      activeIndex,
      setActiveIndex,
      handleClick,
    });

    expect(setActiveIndex).toHaveBeenCalledWith(filteredCameras.length);
  });

  it('should handle Enter key and break correctly', () => {
    activeIndex = 2;

    const event = {
      key: KeyboardButtonName.Enter,
      preventDefault: vi.fn(),
    } as unknown as React.KeyboardEvent<HTMLInputElement>;

    handleSearchKeyDown({
      e: event,
      filteredCameras,
      activeIndex,
      setActiveIndex,
      handleClick,
    });

    expect(handleClick).toHaveBeenCalledWith(filteredCameras[2].id);

    expect(event.preventDefault).toHaveBeenCalled();
  });
});
