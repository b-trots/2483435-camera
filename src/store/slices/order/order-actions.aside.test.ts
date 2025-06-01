import {
  BemMode,
  DefaultParam, NameSpace,
  RequestStatus,
  ServiceParam,
  SliceName
} from '@/const/const';
import {
  addCamera,
  deleteCamera,
  deleteOrderState, isManualInput,
  loadOrderState,
  saveOrderState
} from './order-actions';
import { changeBasket } from './order-slice';
import { OrderSlice } from '@/types/store-types/slices-types';

const mockDispatch = vi.fn();
const mockGetState = vi.fn();
const mockedAxiosPost = vi.fn();

vi.mock('axios', () => ({
  default: {
    post: mockedAxiosPost
  }
}));

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

vi.mock('store/middlewares');

vi.mock('./order-slice', () => ({
  changeBasket: vi.fn(),
}));


describe('isManualInput', () => {
  it('returns true for number input', () => {
    expect(isManualInput(5)).toBe(true);
    expect(isManualInput(0)).toBe(true);
    expect(isManualInput(-1)).toBe(true);
  });

  it('returns false for BemMode.Prev', () => {
    expect(isManualInput(BemMode.Prev)).toBe(false);
  });

  it('returns false for BemMode.Next', () => {
    expect(isManualInput(BemMode.Next)).toBe(false);
  });
});

describe('addCamera', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('adds new camera to basket if not already present', () => {
    const cameraId = 1;
    const initialState = {
      [SliceName.Order]: {
        basket: [
          { id: 2, quantity: 1 },
          { id: 3, quantity: 2 },
        ],
      },
    };

    mockGetState.mockReturnValue(initialState);

    const action = addCamera(cameraId);
    action(mockDispatch, mockGetState);

    expect(mockDispatch).toHaveBeenCalledWith(
      changeBasket([
        ...initialState[SliceName.Order].basket,
        { id: cameraId, quantity: DefaultParam.Unit },
      ])
    );
  });

  it('increments quantity of existing camera without exceeding max', () => {
    const cameraId = 1;
    const initialState = {
      [SliceName.Order]: {
        basket: [
          { id: cameraId, quantity: 2 },
          { id: 2, quantity: 1 },
        ],
      },
    };

    mockGetState.mockReturnValue(initialState);

    const action = addCamera(cameraId);
    action(mockDispatch, mockGetState);

    expect(mockDispatch).toHaveBeenCalledWith(
      changeBasket([
        { id: cameraId, quantity: 3 },
        { id: 2, quantity: 1 },
      ])
    );
  });

  it('does not increment quantity beyond max limit', () => {
    const cameraId = 1;
    const initialState = {
      [SliceName.Order]: {
        basket: [
          { id: cameraId, quantity: ServiceParam.MaxQuantity },
          { id: 2, quantity: 1 },
        ],
      },
    };

    mockGetState.mockReturnValue(initialState);

    const action = addCamera(cameraId);
    action(mockDispatch, mockGetState);

    expect(mockDispatch).toHaveBeenCalledWith(
      changeBasket([
        { id: cameraId, quantity: ServiceParam.MaxQuantity },
        { id: 2, quantity: 1 },
      ])
    );
  });

  it('handles empty basket', () => {
    const cameraId = 1;
    const initialState = {
      [SliceName.Order]: {
        basket: [],
      },
    };

    mockGetState.mockReturnValue(initialState);

    const action = addCamera(cameraId);
    action(mockDispatch, mockGetState);

    expect(mockDispatch).toHaveBeenCalledWith(
      changeBasket([{ id: cameraId, quantity: DefaultParam.Unit }])
    );
  });
});

describe('deleteCamera', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('remote camera with id from basket', () => {
    const cameraIdToDelete = 2;
    const initialState = {
      [SliceName.Order]: {
        basket: [
          { id: 1, quantity: 1 },
          { id: 2, quantity: 3 },
          { id: 3, quantity: 2 },
        ],
      },
    };

    mockGetState.mockReturnValue(initialState);

    const action = deleteCamera(cameraIdToDelete);
    action(mockDispatch, mockGetState);

    expect(changeBasket).toHaveBeenCalledWith([
      { id: 1, quantity: 1 },
      { id: 3, quantity: 2 },
    ]);
  });

  it('does not change the basket if there is no camera with the specified id', () => {
    const nonExistentCameraId = 99;
    const initialState = {
      [SliceName.Order]: {
        basket: [
          { id: 1, quantity: 1 },
          { id: 2, quantity: 3 },
        ],
      },
    };

    mockGetState.mockReturnValue(initialState);

    const action = deleteCamera(nonExistentCameraId);
    action(mockDispatch, mockGetState);

    expect(changeBasket).toHaveBeenCalledWith([
      { id: 1, quantity: 1 },
      { id: 2, quantity: 3 },
    ]);
  });

  it('correctly handles empty cart', () => {
    const cameraId = 1;
    const initialState = {
      [SliceName.Order]: {
        basket: [],
      },
    };

    mockGetState.mockReturnValue(initialState);

    const action = deleteCamera(cameraId);
    action(mockDispatch, mockGetState);

    expect(changeBasket).toHaveBeenCalledWith([]);
  });
});

describe('order storage functions', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', localStorageMock);
    localStorageMock.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('loadOrderState', () => {
    it('should return null when no data in localStorage', () => {
      const result = loadOrderState();
      expect(result).toBeNull();
      expect(localStorage.getItem).toHaveBeenCalledWith(NameSpace.OrderState);
    });

    it('should return parsed OrderSlice when data exists', () => {
      const testData: OrderSlice = {
        basket: [{ id: 1, quantity: 2 }],
        coupon: { name: 'camera-333', value: 15 },
        couponIsChecked: true,
        orderError: '',
        requestStatus: RequestStatus.Idle,
      };
      localStorageMock.setItem(NameSpace.OrderState, JSON.stringify(testData));

      const result = loadOrderState();
      expect(result).toEqual(testData);
      expect(localStorage.getItem).toHaveBeenCalledWith(NameSpace.OrderState);
    });

    it('should return null for invalid JSON data', () => {
      localStorageMock.setItem(NameSpace.OrderState, 'invalid-json');

      const result = loadOrderState();
      expect(result).toBeNull();
    });
  });

  describe('saveOrderState', () => {
    it('should save order state to localStorage', () => {
      const testData: OrderSlice = {
        basket: [{ id: 1, quantity: 1 }],
        coupon: null,
        couponIsChecked: true,
        orderError: '',
        requestStatus: RequestStatus.Idle,
      };

      saveOrderState(testData);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        NameSpace.OrderState,
        JSON.stringify(testData)
      );
    });

    it('should handle empty order state', () => {
      const testData: OrderSlice = {
        basket: [],
        coupon: null,
        couponIsChecked: true,
        orderError: '',
        requestStatus: RequestStatus.Idle,
      };

      saveOrderState(testData);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        NameSpace.OrderState,
        JSON.stringify(testData)
      );
    });
  });

  describe('deleteOrderState', () => {
    it('should remove order state from localStorage', () => {
      const testData: OrderSlice = {
        basket: [{ id: 1, quantity: 1 }],
        coupon: null,
        couponIsChecked: true,
        orderError: '',
        requestStatus: RequestStatus.Idle,
      };
      localStorageMock.setItem(NameSpace.OrderState, JSON.stringify(testData));

      deleteOrderState();

      expect(localStorage.removeItem).toHaveBeenCalledWith(
        NameSpace.OrderState
      );
      expect(localStorageMock.getItem(NameSpace.OrderState)).toBeNull();
    });

    it('should do nothing when no order state exists', () => {
      deleteOrderState();
      expect(localStorage.removeItem).toHaveBeenCalledWith(
        NameSpace.OrderState
      );
    });
  });
});
